import './App.css';
import { useForm } from "react-hook-form";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, BarChart, Bar } from 'recharts';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


function App() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);

  const handleGraph = data => {
    setEasy(data.easy)
    setMedium(data.medium)
    setHard(data.hard)
  }
  const data = [
    {
      name: 'Easy',
      val: easy,
      backgroundColor: 'rgba(255, 99, 132)'
    },
    {
      name: 'Medium',
      val: medium,
      backgroundColor: 'rgba(54, 162, 235)'
    },
    {
      name: 'Hard',
      val: hard,
      backgroundColor: 'rgba(153, 102, 255)'
    }
  ];
  return (
    <div className='mx-5'>
      <div className='border-2 border-cyan-500 rounded-md shadow-md max-w-[800px] mx-auto mt-20 p-8'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleGraph)}>

          <div className='flex justify-between items-center flex-wrap gap-10'>
            <div>
              <label className='text-xl' htmlFor="easy">Easy: </label>
              <input type='number' name='number' className='text-xl py-1 pl-2 border border-cyan-500 outline-none w-20' {...register("easy", { required: "Number is required", min: 0, max: 100 })} />
              {errors.easy && (
                <p className='mt-2 text-red-500'>{errors.easy?.message || `Value Must be between 0-100`}</p>
              )}
            </div>

            <div>
              <label className='text-xl' htmlFor="medium">Medium: </label>
              <input type='number' name='number' className='text-xl py-1 pl-2 border border-cyan-500 outline-none w-20' {...register("medium", { required: "Number is required", min: 0, max: 100 })} />
              {errors.medium && (
                <p className='mt-2 text-red-500'>{errors.medium?.message || `Value Must be 0 to 100`}</p>
              )}
            </div>

            <div>
              <label className='text-xl' htmlFor="hard">Hard: </label>
              <input type='number' name='number' className='text-xl py-1 pl-2 border border-cyan-500 outline-none w-20' {...register("hard", { required: "Number is required", min: 0, max: 100 })} />
              {errors.hard && (
                <p className='mt-2 text-red-500'>{errors.hard?.message || `Value Must be 0 to 100`}</p>
              )}
            </div>
          </div>

          <input type="submit" value='Refresh' className='text-xl py-2 text-white bg-cyan-500 w-32 border rounded-md cursor-pointer mx-auto mt-3' />
          <div className='mt-10 bg-gray-200 shadow-lg rounded-xl'>
            <Bar data={{
              labels: ['Easy', 'Medium', 'Hard'],
              datasets: [{
                label: 'Hidden',
                data: data.map(item => item.val),
                backgroundColor: data.map(item => item.backgroundColor),
              }]
            }}></Bar>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
