from django.db import models


from django.conf import settings

class Business(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="businesses")
	name = models.CharField(max_length=255)
	type = models.CharField(max_length=50)
	industry = models.CharField(max_length=100)
	registration_number = models.CharField(max_length=50)
	location = models.CharField(max_length=255)
	phone = models.CharField(max_length=30)
	website = models.CharField(max_length=255, blank=True, null=True)
	status = models.CharField(max_length=20, choices=[('active', 'Active'), ('pending', 'Pending'), ('inactive', 'Inactive')], default='pending')
	employees = models.PositiveIntegerField()
	revenue = models.CharField(max_length=30)
	registration_date = models.DateField(auto_now_add=True)

class UploadedReport(models.Model):
    REPORT_TYPES = [
        ('excel', 'Excel'),
        ('csv', 'CSV'),
        ('json', 'JSON'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reports')
    business = models.ForeignKey('Business', on_delete=models.CASCADE, related_name='reports', null=True, blank=True)
    file = models.FileField(upload_to='reports/')
    file_type = models.CharField(max_length=10, choices=REPORT_TYPES)
    original_filename = models.CharField(max_length=255)
    parsed_data = models.JSONField(default=dict)   # stores extracted rows after parsing
    uploaded_at = models.DateTimeField(auto_now_add=True)
    label = models.CharField(max_length=100, blank=True)  # user-given name e.g. "Q1 Financials"

class DashboardMetric(models.Model):
    business = models.ForeignKey('Business', on_delete=models.CASCADE, related_name='metrics')
    report = models.ForeignKey('UploadedReport', on_delete=models.SET_NULL, null=True, blank=True)
    metric_key = models.CharField(max_length=100)    # e.g. "total_revenue", "compliance_count"
    metric_value = models.FloatField()
    period_label = models.CharField(max_length=50)   # e.g. "Jan 2025", "Q1"
    computed_at = models.DateTimeField(auto_now=True)

class Meta:
    unique_together = ('business', 'metric_key', 'period_label')

class CompanyHistoryDocument(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)
    description = models.CharField(max_length=500, blank=True)
    file = models.FileField(upload_to='company_history/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} — {self.filename}"
           
def __str__(self):
        return f"{self.label or self.original_filename} ({self.user})"
    
