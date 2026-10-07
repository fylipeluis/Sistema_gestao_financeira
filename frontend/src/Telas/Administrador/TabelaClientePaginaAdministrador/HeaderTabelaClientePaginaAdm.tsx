import "./HeaderTabelaClientePaginaAdm.css";

export function HeaderTabelaClientePaginaAdm (){
    return(
        <div className="table-container">

            <table id="clientesTable">

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
            </table>

        </div>
    )
}
        