from django.db import models
from django.utils.translation import ugettext_lazy as _


class Room(models.Model):
    nome = models.CharField(_('Nome'), max_length=100, blank=False, null=False)
    max_players = models.IntegerField(_('Máximo de jogadores'), blank=False, null=False, default=2)
    criado_em = models.DateTimeField(auto_now_add=True)
    ativo = models.BooleanField(_('Ativo'), default=True)
    
    
    def __str__(self):
        return self.nome