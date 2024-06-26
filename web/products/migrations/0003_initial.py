# Generated by Django 4.2 on 2023-12-07 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0002_delete_products'),
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=200)),
                ('published_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('status', models.CharField(choices=[('active', 'active'), ('draft', 'draft')], default='active', max_length=50)),
                ('vendor', models.CharField(max_length=200)),
            ],
        ),
    ]
