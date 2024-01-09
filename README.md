# Dashgo.

## React Query

- `resetQueries`: Este método redefinirá o estado de uma consulta para o estado inicial. Isso inclui a remoção de todos os dados, erros e metadados da consulta.

- `cancelQueries`: Este método cancelará as consultas em andamento. Isso é útil quando você deseja evitar que consultas desnecessárias sejam concluídas, por exemplo, quando o usuário navega para uma nova página antes que as consultas da página anterior sejam concluídas.

- `removeQueries`: Este método remove completamente as consultas do cache. Isso é útil quando você sabe que não precisará mais dos dados da consulta e deseja liberar memória.

- `invalidateQueries`: Este método marca uma consulta como "desatualizada", o que fará com que ela seja refetchada na próxima vez que for usada. Isso é útil quando você sabe que os dados subjacentes mudaram e deseja que a consulta busque os dados mais recentes.
