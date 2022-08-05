import "./styles.css";
import NotificationButton from "../../Components/NotificationButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { Sale } from "../../models/sale";

function SalesCard() {
    //data de 1 ano atras sendo minimo, que é basicamente a data atual = 365 dias = 1ano;
    const min = new Date(new Date().setDate(new Date().getDate() - 365));
    //definindo a data max pra ser escolhida, no caso é o dia atual da pessoa;
    const max = new Date();
    //setando os estados min e max date, onde teremos a mudança de acordo com oque o cliente quer
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    //definindo que meu estado sales, vai ser um useSate e que esse useState vai ser do typo Sale (foi criado antes, funciona parecido com struct)
    //com isso meu useState vai ser uma lista do tipo Sale, e colocamos dentor dos () o valor inicial, que no caso é uma lista vazia;
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const dmin = minDate.toISOString().slice(0,10);
        const dmax = maxDate.toISOString().slice(0,10);

        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`).then((response) => {
            setSales(response.data.content);
        });
    }, [minDate, maxDate]);

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => {
                            setMinDate(date);
                        }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => {
                            setMaxDate(date);
                        }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => {
                            return (
                                <tr key={sale.id}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{sale.deals}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <NotificationButton saleId={sale.id}></NotificationButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesCard;
