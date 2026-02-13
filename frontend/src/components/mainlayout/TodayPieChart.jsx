import { useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import "./TodayPieChart.css";
import { getTodayDailyPerformance } from "../../api/dailyPerformance.js";
import { onDailyPerformanceChanged } from "../../events/dailyPerformanceEvents.js";

export default function TodayPieChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const loadData = useCallback(async () => {
        try {
            const res = await getTodayDailyPerformance();

            const {
                subtasksCompleted,
                subtasksIncompleted,
                subtasksCancelled,
            } = res.data;

            const newData = [
                subtasksCancelled,
                subtasksCompleted,
                subtasksIncompleted,
            ];

            if (chartInstance.current) {
                // Update existing chart in-place
                chartInstance.current.data.datasets[0].data = newData;
                chartInstance.current.update();
            } else {
                // Create chart for the first time
                chartInstance.current = new Chart(chartRef.current, {
                    type: "doughnut",
                    data: {
                        labels: ["Cancel", "Done", "Incomplete"],
                        datasets: [
                            {
                                data: newData,
                                backgroundColor: [
                                    "rgb(255, 99, 132)",
                                    "rgb(54, 162, 235)",
                                    "rgb(255, 205, 86)",
                                ],
                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: "bottom" },
                        },
                    },
                });
            }
        } catch (err) {
            console.error("Load daily performance failed", err);
        }
    }, []);

    useEffect(() => {
        loadData();

        const unsubscribe = onDailyPerformanceChanged(loadData);

        return () => {
            unsubscribe();
            chartInstance.current?.destroy();
        };
    }, [loadData]);

    return (
        <div className="today-pie">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
