import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'


const SalesTrend_Data = [
    { month: "Jan", Sales: 3900 },
    { month: "Feb", Sales: 3000 },
    { month: "Mar", Sales: 5000 },
    { month: "Apr", Sales: 3500 },
    { month: "May", Sales: 6000 },
    { month: "Jun", Sales: 5600 },
    { month: "Jul", Sales: 7300 },

]

const SalesTrendChart = () => {
    return (
        <motion.div
            // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
            className='bg-white shadow-sm rounded-xl p-5 border border-gray-200'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3 }}
        >
            {/* THAY ĐỔI: text-gray-800 */}
            <h2 className='text-lg font-medium mb-4 text-gray-800'>
                Sales Trend
            </h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width={'100%'} height={"100%"}>
                    <LineChart data={SalesTrend_Data}>
                        {/* THAY ĐỔI: stroke lưới nhạt */}
                        <CartesianGrid strokeDasharray={'3 3'} stroke='#e5e7eb' />
                        {/* THAY ĐỔI: stroke trục đậm hơn */}
                        <XAxis dataKey={"month"} stroke='#6b7280' />
                        <YAxis stroke='#6b7280' />
                        <Tooltip
                            // THAY ĐỔI: Tooltip nền trắng, chữ đậm
                            contentStyle={{
                                backgroundColor: "#fff",
                                borderColor: "#e5e7eb"
                            }}
                            itemStyle={{ color: "#374151" }}
                        />
                        <Line
                            type="monotone"
                            dataKey='Sales'
                            stroke='#8b5cf6'
                            strokeWidth={2}
                        />
                        {/* THAY ĐỔI: Legend chữ đậm */}
                        <Legend wrapperStyle={{ color: "#374151" }}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default SalesTrendChart