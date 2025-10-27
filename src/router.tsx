import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/appLayout/app-layout'
import NotMatch from './components/pages/NotMatch'
import Dashboard from './components/pages/Dashboard'
import Sample from './components/pages/Sample'
import ComingSoon from './components/pages/ComingSoon'
import DetailsWrapper from './components/pages/details'

export default function Router() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="" element={<Dashboard />} />
               <Route path="pages">
                    <Route path="sample" element={<Sample />} />
                    <Route path="feature" element={<ComingSoon />} />
                    <Route path="details" element={<DetailsWrapper />}/>
                </Route>
                <Route path="*" element={<NotMatch />} /> 
            </Route> 
        </Routes>
    )
}
