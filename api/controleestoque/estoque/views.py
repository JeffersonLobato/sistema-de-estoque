from rest_framework import response, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Usuario
from .models import Itens
from .models import Edicao
from .serializers import UserSerializer
from .serializers import ItemSerializer
from .serializers import EdicaoSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime


class UserViewSet(viewsets.ModelViewSet):
  
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['^perfil', '^nome_guerra']
    filterset_fields = ['id','posto', 'perfil', 'nome_guerra', 'username', 'password', 'primeiro_acesso']
    lookup_field= 'username'
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    
    def create(self, request, *args, **kwargs):
        user = Usuario.objects.create_user(
            posto = request.data['posto'],
            perfil = request.data['perfil'],
            nome_guerra = request.data['nome_guerra'],
            username = request.data['username'],
            password = request.data['password'],
            primeiro_acesso = request.data['primeiro_acesso'],
            )
        user.set_password(user.password)

        return response.Response('Salvo com sucesso!')
    
    def update(self, request, *args, **kwargs):

        """Pegando o usuario pelo id"""        
        userUpdate = Usuario.objects.get(id = request.data['id'])
       
        """Atualizando os campos de usuário"""
        userUpdate.posto = request.data['posto']
    
        userUpdate.perfil = request.data['perfil']

        userUpdate.nome_guerra = request.data['nome_guerra']

        userUpdate.username = request.data['username']

        userUpdate.primeiro_acesso = request.data['primeiro_acesso']
        
        userUpdate.password = request.data['password']
        
        userUpdate.set_password(userUpdate.password)
         
        userUpdate.primeiro_acesso = request.data['primeiro_acesso']

        """Salvando no banco de dados"""
        userUpdate.save()
        
        return response.Response('Salvo com sucesso!')

    def partial_update(self, request, *args, **kwargs):

        """Pegando o usuario pelo ID"""
        userUpdate = Usuario.objects.get(id = request.data['id'])
       
        """Atualizando os campos do usuário"""
        if 'posto' in request.data:
            userUpdate.posto = request.data['posto']
        
        if 'perfil' in request.data:
            userUpdate.perfil = request.data['perfil']

        if 'nome_guerra' in request.data:
            userUpdate.nome_guerra = request.data['nome_guerra']

        if 'username' in request.data:
            userUpdate.username = request.data['username']

        if 'password' in request.data:
            userUpdate.primeiro_acesso = request.data['primeiro_acesso']
            userUpdate.password = request.data['password']
            userUpdate.set_password(userUpdate.password)
        
        if 'primeiro_acesso' in request.data:
            userUpdate.primeiro_acesso = request.data['primeiro_acesso']

        """Salvando no banco de dados"""
        userUpdate.save()
        
        return response.Response('Salvo com sucesso!')

class ItemViewSet(viewsets.ModelViewSet):
  
    queryset = Itens.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['^ficha', '^setor', '^descricao', '^quantidade', '^data', '^retmensal']
    filterset_fields = ['ficha', 'setor', 'descricao', 'quantidade', 'data', 'retmensal']
    lookup_field= 'ficha'
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
   
        

class EdicaoViewSet(viewsets.ModelViewSet):
  
    queryset = Edicao.objects.all()
    serializer_class = EdicaoSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['^usuario', '^acao', '^ficha', '^setor','^descricao', '^quantidadeAcao', '^quantidadeTotal', '^data_saida', '^data_entrada', '^homologado']
    filterset_fields = ['usuario', 'acao', 'ficha', 'setor', 'descricao', 'quantidadeAcao', 'quantidadeTotal', 'data_saida', 'data_entrada', 'retmensal', 'hora', 'secao', 'homologado']
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]


    def create(self, request, *args, **kwargs):


        """Pegando o histórico enviado pelo client"""
        historicoCreate = Edicao.objects.create(
                                                usuario = request.data['usuario'],
                                                acao = request.data['acao'],
                                                ficha = request.data['ficha'],
                                                setor = request.data['setor'],
                                                descricao = request.data['descricao'],
                                                quantidadeAcao = request.data['quantidadeAcao'],
                                                quantidadeTotal = request.data['quantidadeTotal'],
                                                data_saida = request.data['data_saida'],
                                                data_entrada = request.data['data_entrada'],
                                                retmensal = request.data['retmensal'],
                                                hora = request.data['hora'],
                                                secao = request.data['secao'],
                                                homologado = request.data['homologado'],
                                                )

        if historicoCreate.acao == 'Retirada':

            """Pegando os itens pela ficha"""
            itemUpdate = Itens.objects.get(ficha = request.data['ficha'])

            """Pegando o historico de retiradas desse item"""
            consultaEdicao = Edicao.objects.filter(ficha = request.data['ficha'], acao = 'Retirada')


            """ vamos atualizar a média de retirada mensal de acordo com a quantidade de item que saíram
            dentro do espaço de tempo do primeiro ao último dia do item no sistema, isso só vai ocorrer
            se houver mais de 3 lançamentos de retirada"""
            if len(consultaEdicao) >= 3:

                data_saida = []
                quant_saida = 0

                """Pegando a maior data no histórico e a data de entrada do item
                para obter o tempo e pegando quantidadede itens que saíram."""
                for consulta in consultaEdicao:
                    data_saida.append(str(consulta.data_saida))
                    quant_saida += consulta.quantidadeAcao

                data_saida.append(str(historicoCreate.data_saida))
                quant_saida += historicoCreate.quantidadeAcao

                menor_data = itemUpdate.data
                maior_data = data_saida[0]

                for i in range(0,len(data_saida)):

                    if data_saida[i] > maior_data:
                        maior_data = data_saida[i]
                
                """Calculando a quantidade de dias desde a entrada do ítem no sistema"""
                d2 = datetime.strptime(str(maior_data), '%Y-%m-%d')
                
                d1 = datetime.strptime(str(menor_data), '%Y-%m-%d')

                total_dias = abs((d2 - d1).days)

                """Se tiver pelo menos 3 meses de registros ele fará o cálculo da média de retirada mensal"""
                if total_dias >= 90:

                    """Calculando a retirada mensal com base no perído e quantidade de itens retirados"""
                    retiradaMes = (quant_saida/total_dias)*30

                    """Atualizando o campo do item"""
                    historicoCreate.retmensal = int(retiradaMes)
                    itemUpdate.retmensal = int(retiradaMes)

                    """Salvando no banco de dados"""
                    itemUpdate.save()

        """Salvando no banco de dados"""
        historicoCreate.save()

        return response.Response('Histórico salvo com sucesso.')