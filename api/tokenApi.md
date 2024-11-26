# TOKEN API SUPABASE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZ2N0c3RwdGF5cnhza3dhcWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NTM5NzgsImV4cCI6MjA0NDUyOTk3OH0.6qOP2ANbwnxHosWnupL8Wbdhl7AtpZNAOrcBZ91Hzzk

# PROJETO SUPABASE
Ver em casa pra trocar a autenticacao

## Sistema de Autenticacao
### Sistema
siscodigo
sisnome
sisativo

### Usuario
usucodigo
usunome
usulogin
ususenha
usuativo

### UsuarioSistema - Definir qual usuario usa o sistema atual
siscodigo
usucodigo

### Telas dos Sistemas
siscodigo   - Sistema 1
telcodigo   - Tela 1
telnome     - Produto
telativo    - 1

siscodigo   - Sistema 1
telcodigo   - Tela 2
telnome     - Pessoa
telativo    - 1

### Permissao das Telas dos Sistemas - Se usuario nao for listado para a tela, nao tem permissao
siscodigo
telcodigo
usucodigo
perfil - codigo

### Tabela perfil - Master(Todos os Sistemas e Telas), Admin, Gerente, Loja, Vendedor
* Lista de permissao = JSON
perfil - codigo - 1 - Admin
perfil - nome
siscodigo
telas - lista de telas - JSON
[ {
    "siscodigo":1,
    "telcodigo":1,
    "index": "true",
    "update": "true",
    "insert": "true",
    "delete": "true",
},
{
    "siscodigo":1,
    "telcodigo":2,
    "index": "true",
    "update": "true",
    "insert": "true",
    "delete": "true",
}
]

Ideia 01
Cantina Digital
Usuario e senha

Ideia 02
Banco Digital
Usuario e senha