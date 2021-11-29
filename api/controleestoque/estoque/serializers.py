from .models import Usuario
from .models import Itens
from .models import Edicao
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','posto', 'perfil', 'nome_guerra', 'username', 'password', 'primeiro_acesso']


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Itens
        fields = ['id','ficha', 'setor', 'descricao', 'quantidade', 'data', 'retmensal']
       


class EdicaoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Edicao
        fields = ['id','usuario', 'acao', 'ficha', 'setor', 'descricao', 'quantidadeAcao', 'quantidadeTotal', 'data_saida', 'data_entrada', 'retmensal', 'hora', 'secao', 'homologado']