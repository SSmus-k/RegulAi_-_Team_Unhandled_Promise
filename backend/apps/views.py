# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from django.db import models
# from core import models as core_models
# from .models import Business
# from .serializers import BusinessSerializer
# import pandas as pd
# from rest_framework.parsers import MultiPartParser, FormParser
# from .models import UploadedReport
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db import models
from .models import Business, UploadedReport
from .serializers import BusinessSerializer
import pandas as pd
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class UserBusinessesListView(generics.ListCreateAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Business.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "status": "success",
                "data": serializer.data,
                "message": "Business created successfully.",
            },
            status=status.HTTP_201_CREATED,
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "status": "success",
                "data": serializer.data,
                "message": "Businesses fetched successfully.",
            }
        )
    


class ReportUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided.'}, status=400)

        filename = file.name
        ext = filename.rsplit('.', 1)[-1].lower()

        if ext not in ('xlsx', 'xls', 'csv'):
            return Response({'error': 'Only .xlsx, .xls, .csv files are supported.'}, status=400)

        try:
            if ext == 'csv':
                df = pd.read_csv(file)
            else:
                df = pd.read_excel(file, engine='openpyxl')
        except Exception as e:
            return Response({'error': f'Failed to parse file: {str(e)}'}, status=422)

        parsed = {
            'columns': list(df.columns),
            'rows': df.fillna('').to_dict(orient='records'),
            'row_count': len(df),
        }

        report = UploadedReport.objects.create(
            user=request.user,
            file=file,
            file_type=ext if ext != 'xls' else 'excel',
            original_filename=filename,
            parsed_data=parsed,
            label=request.data.get('label', ''),
        )
        return Response({
            'id': report.id,
            'label': report.label or report.original_filename,
            'columns': parsed['columns'],
            'row_count': parsed['row_count'],
            'uploaded_at': report.uploaded_at,
        }, status=201)


class ReportDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            report = UploadedReport.objects.get(pk=pk, user=request.user)
        except UploadedReport.DoesNotExist:
            return Response({'error': 'Not found.'}, status=404)
        return Response({
            'id': report.id,
            'label': report.label or report.original_filename,
            'parsed_data': report.parsed_data,
            'uploaded_at': report.uploaded_at,
        })


class UserReportsListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reports = UploadedReport.objects.filter(user=request.user).order_by('-uploaded_at')
        return Response([{
            'id': r.id,
            'label': r.label or r.original_filename,
            'file_type': r.file_type,
            'row_count': r.parsed_data.get('row_count', 0),
            'uploaded_at': r.uploaded_at,
        } for r in reports])