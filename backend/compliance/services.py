from regulations.models import Rule, Regulation
from .models import ComplianceChecklist, ComplianceStep
from users.models import User

# Decision engine: matches business action to rules

def generate_compliance_checklist(user: User, business_action: str):
    rules = Rule.objects.filter(business_type=user.business_type, business_action=business_action)
    checklist = ComplianceChecklist.objects.create(user=user, business_action=business_action)
    for rule in rules:
        ComplianceStep.objects.create(
            checklist=checklist,
            description=rule.mapping_logic,
            regulation=rule.regulation
        )
    return checklist
