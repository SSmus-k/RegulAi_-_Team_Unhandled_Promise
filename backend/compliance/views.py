from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ComplianceChecklist, ComplianceStep
from .serializers import ComplianceChecklistSerializer
from regulations.models import Rule


class ComplianceChecklistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Return all checklists belonging to the logged-in user."""
        checklists = ComplianceChecklist.objects.filter(
            user=request.user
        ).prefetch_related("steps__regulation").order_by("-created_at")
        serializer = ComplianceChecklistSerializer(checklists, many=True)
        return Response({"data": serializer.data})

    def post(self, request):
        """
        Generate a compliance checklist for the given business_type + action.
        Body: { "business_type": "Private Limited", "action": "registration" }
        """
        business_type = request.data.get("business_type", "").strip()
        action = request.data.get("action", "").strip()

        if not business_type or not action:
            return Response(
                {"error": "business_type and action are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Find matching rules
        rules = Rule.objects.filter(
            business_type=business_type,
            business_action=action,
        ).select_related("regulation")

        if not rules.exists():
            return Response(
                {"error": f"No compliance rules found for '{business_type}' doing '{action}'."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Create checklist
        checklist = ComplianceChecklist.objects.create(
            user=request.user,
            business_action=action,
            business_type=business_type,
        )

        # Create steps from rules
        steps = []
        for rule in rules:
            step = ComplianceStep.objects.create(
                checklist=checklist,
                description=rule.mapping_logic,
                regulation=rule.regulation,
                approval_required=getattr(rule, "approval_required", False),
                deadline=getattr(rule, "deadline", None),
            )
            steps.append(step)

        serializer = ComplianceChecklistSerializer(checklist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ComplianceStepStatusView(APIView):
    """Mark a single step as completed / in_progress / etc."""
    permission_classes = [IsAuthenticated]

    def patch(self, request, step_id):
        try:
            step = ComplianceStep.objects.get(
                id=step_id, checklist__user=request.user
            )
        except ComplianceStep.DoesNotExist:
            return Response({"error": "Step not found."}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get("status")
        allowed = [s[0] for s in ComplianceStep.STATUS_CHOICES]
        if new_status not in allowed:
            return Response(
                {"error": f"Invalid status. Choices: {allowed}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        step.status = new_status
        if new_status == "completed":
            from django.utils import timezone
            step.completed_at = timezone.now()
        step.save()
        return Response({"id": step.id, "status": step.status})