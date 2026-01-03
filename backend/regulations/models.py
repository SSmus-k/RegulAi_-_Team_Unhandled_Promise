from django.db import models

class Regulation(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    source = models.CharField(max_length=255)
    effective_date = models.DateField()
    document = models.FileField(upload_to='regulations/', null=True, blank=True)

class Rule(models.Model):
    regulation = models.ForeignKey(Regulation, on_delete=models.CASCADE)
    business_type = models.CharField(max_length=100)
    business_action = models.CharField(max_length=100)
    mapping_logic = models.TextField()  # Placeholder for rule logic
