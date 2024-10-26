import React, { useEffect, useState } from 'react';
import Card from './Card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { add, addAmount } from '../redux/slices/List';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Start = () => {
    //for per person calculations
    const [totalAmount , setTotalAmount] = useState(0);
    const [person, setPerson] = useState(0);
    const per_person = (parseFloat(totalAmount) / person).toFixed(2);
    //main data
    const [data, setData] = useState({ name: "", cost: "" });
    const [fetchedItems, setFetchedItems] = useState([]);
    //these two for pie chart
    const [allItem, setAllitem] = useState([]);
    const [allAmount, setAllamount] = useState([]);

    useEffect(() => {
        let ItemList = [];
        let ItemAmount = [];
        let newTotalAmount = 0;

        for (let i = 0; i < fetchedItems.length; i++) {
            ItemList.push(fetchedItems[i].name);
            ItemAmount.push(parseInt(fetchedItems[i].cost));
            newTotalAmount += parseInt(fetchedItems[i].cost);
        }
        setAllitem(ItemList);
        setAllamount(ItemAmount);
        setTotalAmount(newTotalAmount);
    }, [fetchedItems]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/fetchitem'); 
            console.log("Data from DB-> ",response.data.data);
            setFetchedItems(response.data.data); 
        } 
        catch (error) {
            console.error('Error fetching items:', error.message);
        }
    }

    function personhandler(event) {
        setPerson(event.target.value);
    }

    async function addhandler() {
        if (data.name === "" || data.amount === "") {
            toast.error("Please enter all values");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/additems', {
                //this is req.body
                name: data.name,
                cost: data.amount
            });
            toast.success("Added to List");
            setData({ name: '', amount: '' });
            console.log('Item added:', response.data);
        }
        catch (error) {
            console.error('Error adding item:', error.response ? error.response.data : error.message);
            toast.error("An error occured");
        }
        finally{
            fetchItems();
        }
    }

    function changehandler(event) {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className='app'>
            <div className="app_container">
                <div className="pie_chart">
                    <div className="person">
                        <span>
                            Total Expense: Rs.{totalAmount}
                            <label htmlFor="">
                                No. of Person: <input type="text" placeholder='Ex- 1' value={person} onChange={personhandler} />
                            </label>
                            Expense Per Person: <div style={{ color: 'green' }}>Rs.{per_person}</div>
                        </span>
                    </div>
                    <div className="pie">
                        <Chart
                            type='pie'
                            width={400}
                            height={400}
                            series={allAmount}
                            options={{
                                noData: { text: "No Data" },
                                labels: allItem
                            }}
                        />
                    </div>
                </div>
                <div className="track_data">
                    <div className="item_data">
                        {fetchedItems.length > 0 ? (
                            <>
                                {fetchedItems.map((item) => (
                                    <Card key={item._id} item={item}  fetchItems = {fetchItems} setData = {setData}/>
                                ))}
                            </>
                        ) : (
                            <div>Start adding your expenses here.</div>
                        )}
                    </div>
                    <div className="add_data">
                        <div className="input_data">
                            <input type="text"
                                placeholder='Ex: Hotel'
                                name='name'
                                value={data.name}
                                onChange={changehandler} />
                            <input type="text"
                                placeholder='Rs.'
                                name='amount'
                                value={data.amount}
                                onChange={changehandler} />
                        </div>
                        <div className="add_button">
                            <button onClick={addhandler}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start;
