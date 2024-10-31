import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/login/Login';
import './scss/style.scss'
import Page404 from './views/error/Page404';
import Page500 from './views/error/Page500';
import { CSpinner, useColorModes } from '@coreui/react'
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
	const { isColorModeSet, setColorMode } = useColorModes('dark')
	useEffect(() => {
		setColorMode("dark")
		if (isColorModeSet()) {
			return
		}

	}, [])
	return (
		<BrowserRouter>
			<Suspense
				fallback={
					<div className="pt-3 text-center">
						<CSpinner color="primary" variant="grow" />
					</div>
				}
			>
				<Routes>
					<Route exact path="/login" name="Login Page" element={<Login />} />
					<Route exact path="/404" name="Page 404" element={<Page404 />} />
					<Route exact path="/500" name="Page 500" element={<Page500 />} />
					<Route path="*" name="Home" element={<DefaultLayout />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;


//http://localhost:3000/bmc-device/server
//http://localhost:3000/bmc-device/boa-group
//http://localhost:3000/monitoring/all
//http://localhost:3000/monitoring/event-log
//http://localhost:3000/maintenance/inventory-catalog
// http://localhost:3000/dashboard