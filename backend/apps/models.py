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

	def __str__(self):
		return f"{self.name} ({self.type})"
