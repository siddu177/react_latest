import { PageHeader, PageHeaderHeading } from "../pages/page-header";
import { useNavigate } from "react-router-dom"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";

export default function Dashboard() {
    const navigate = useNavigate()
    const cards = [
        { title: "Users", content: "1,200 active users" },
        { title: "Sales", content: "$23,000 this month" },
        { title: "Performance", content: "Up 12%" }
    ];
    const actionHandler = (item) => {
        console.log("item clicked", item);
        navigate("/pages/details") // 👈 navigates to /profile route
    }

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Dashboard</PageHeaderHeading>
            </PageHeader>
            <div className="p-6">
                {/* Responsive grid - 1 column on small, 4 columns on large */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((item, index) => (
                        <Card key={index} className="shadow-md hover:shadow-lg transition" onClick={() => { actionHandler(item) }}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{item.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
