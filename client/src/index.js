import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import { QueryClient, QueryClientProvider } from 'react-query'
const root = ReactDOM.createRoot(document.getElementById('root'))

const queryClient = new QueryClient()

root.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</BrowserRouter>
)
