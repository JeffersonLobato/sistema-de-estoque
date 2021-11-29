from django.contrib import admin
from .models import Usuario
from .models import Itens
from .models import Edicao


admin.site.register(Usuario)
admin.site.register(Itens)
admin.site.register(Edicao)

