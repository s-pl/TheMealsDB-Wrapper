import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import MealsPage from './pages/MealsPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import CategoryMealsPage from './pages/CategoryMealsPage.jsx'
import MealDetailPage from './pages/MealDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryName" element={<CategoryMealsPage />} />
          <Route path="/meals/:mealId" element={<MealDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
