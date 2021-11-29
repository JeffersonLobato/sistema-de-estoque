from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    posto = models.CharField(max_length=255)
    perfil = models.CharField(max_length=255)
    nome_guerra = models.CharField(max_length=255)
    primeiro_acesso = models.BooleanField(default=True)

class Itens(models.Model):
    ficha = models.IntegerField(max_length=11, unique=True)
    setor = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    quantidade = models.IntegerField(max_length=11)
    data = models.DateField(max_length=3)
    retmensal = models.IntegerField(max_length=11)


class Edicao(models.Model):
    usuario = models.CharField(max_length=255)
    acao = models.CharField(max_length=255)
    ficha = models.IntegerField(max_length=11)
    setor = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    quantidadeAcao = models.IntegerField(max_length=11, blank=True)
    quantidadeTotal = models.IntegerField(max_length=11, blank=True)
    data_saida = models.DateField(max_length=3)
    data_entrada = models.DateField(max_length=3)
    retmensal = models.IntegerField(max_length=11)
    hora = models.TimeField(max_length=3)
    secao = models.TextField(max_length=255, blank=True)
    homologado = models.BooleanField(default=False)

