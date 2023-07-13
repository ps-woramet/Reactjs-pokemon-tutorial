import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading'

// Components
import FavPoke from './Components/FavPoke'

function App() {
  const [poke, setPoke] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  // useEffect ใช้สำหรับจัดการกับผลกระทบที่เกิดขึ้นหลังจากที่คอมโพเนนต์ถูกเรนเดอร์
  // dependencies ถูกกำหนดเป็น [] (อาร์เรย์ว่าง), แสดงว่าฟังก์ชันใน useEffect จะถูกเรียกในการ render แรกเท่านั้น
  useEffect(()=>{
    // AbortController ใช้สำหรับสร้างสัญญาณ และ ยกเลิกการดำเนินการต่างๆได้เช่น http request
    let abortController = new AbortController();

    const loadPoke = async () => {
      try{
      
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });
        
        setPoke(response.data);
        setError("");

      } catch(error){
        setError("Something went wrong", error)

      } finally{
        setLoading(false);
      }
    }

    loadPoke();

    return () => abortController.abort();
  }, [number])

  console.log(poke);
  console.log('pokemon id', number)
  console.log("Your fav pokemon", fav)

  // Spread operator (...) เป็นตัวดำเนินการใน JavaScript ที่ใช้สำหรับคัดลอกข้อมูลจากอาร์เรย์หรือออบเจกต์ให้กลายเป็นค่าแยกต่างหาก และใช้ในการรวมข้อมูลใหม่เข้ากับข้อมูลที่มีอยู่แล้วในรูปแบบที่เป็นสำเนา (copy) ของอาร์เรย์หรือออบเจกต์เดิม
  // const arr = [1, 2, 3];
  // const newArr = [...arr, 4]; // เพิ่มค่า 4 เข้าไปในอาร์เรย์ newArr
  // console.log(newArr); // Output: [1, 2, 3, 4]
  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
    // หากใส่ {} ต้องทำการ return
    //  setFav((oldState) => {return [...oldState, poke];});
  }

  // รับค่า array fav มา และ เพิ่ม poke เข้าไป
  const addFav2 = () => {
    setFav((oldState) => {
      const newState = oldState.slice(); // คัดลอกอาร์เรย์เดิม
      newState.push(poke); // เพิ่ม poke เข้าไปใน newState
      return newState; // อัปเดตค่า state ใหม่
    });
  };

  // รับค่า number เก่า และ นำค่า number - 1
  const prevPoke = () => {
    setNumber((n) => n - 1)
  }

  // รับค่า number เก่า และ นำค่า number + 1
  const nextPoke = () => {
    // หากใส่ {} ต้องทำการ return
    setNumber((n) => {return n + 1})
  }


  // poke?.name หมายถึงการเช็คค่า null หรือ undefinedของ poke ด้วย ? แล้วจะแสดงค่า name ถ้า poke มีค่าอยู่
  return (
    <div className="max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
          <div>
            {loading ? <ReactLoading type = 'spin' color = 'black' height = {'20%'} width = {'20%'}/>:
            <>
              <h1>{poke?.name}</h1>
              <button onClick={addFav}>Add to Favourite</button>
              <img style = {{margin: '0 auto'}}src={poke?.sprites?.front_default} alt={poke?.name} />
              <ul>
                {poke?.abilities?.map((abil, idx) => (
                  <li key={idx}>{abil.ability.name}</li>
                ))}
              </ul>
              <button onClick={prevPoke}>Previous</button>
              <button onClick={nextPoke}>Next</button>
            </>}     
          </div>
          <div>
            <h2>Your favourite pokemon</h2>
            {fav.length > 0 ? <FavPoke favValue={fav} /> : <div className='flex h-full justify-center items-center'><p>No favarite pokemons...</p></div>}
          </div>
        </div>
    </div>
  )
}

export default App
