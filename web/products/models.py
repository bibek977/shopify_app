from django.db import models

class Products(models.Model):
    product_id = models.IntegerField(default=0)
    title = models.CharField(max_length=200)
    published_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    # image = models.ImageField(upload_to="media/images/")
    status = models.CharField(max_length=50)
    vendor = models.CharField(max_length=200)

    def __str__(self):
        return self.title
