from django.db import models


from django.conf import settings

class Business(models.Model):

	BUSINESS_TYPE_CHOICES = [
		("sole_proprietorship", "Sole proprietorship"),
		("partnership", "Partnership"),
		("private_limited", "Private Limited"),
		("public_limited", "Public Limited")
	]

	REVENUE_CHOICES = [
        ("0_10", "0M - 10M NPR"),
        ("10_30", "10M - 30M NPR"),
        ("30_50", "30M - 50M NPR"),
        ("50_100", "50M - 100M NPR"),
        ("100_plus", "100M+ NPR"),
    ]

	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="businesses")
	name = models.CharField(max_length=255)
	type = models.CharField(max_length=50, choices=BUSINESS_TYPE_CHOICES)
	industry = models.CharField(max_length=100)
	registration_number = models.CharField(max_length=50)
	location = models.CharField(max_length=255)
	phone = models.CharField(max_length=30)
	website = models.CharField(max_length=255, blank=True, null=True)
	status = models.CharField(max_length=20, choices=[('active', 'Active'), ('pending', 'Pending'), ('inactive', 'Inactive')], default='pending')
	employees = models.PositiveIntegerField()
	revenue = models.CharField(max_length=30, choices=REVENUE_CHOICES)
	registration_date = models.DateField(auto_now_add=True)

	def __str__(self):
		return f"{self.name} ({self.type})"
