# Generated by Django 3.2.7 on 2021-10-24 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estoque', '0003_auto_20211021_2056'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='primeir_acesso',
            field=models.BooleanField(default=True),
        ),
    ]
