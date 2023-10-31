// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import NavbarLayout from 'src/layouts/NavbarLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout} title="Parts" titleTo="parts" buttonLabel="New Part" buttonTo="newPart">
          <Route path="/admin/parts/new" page={PartNewPartPage} name="newPart" />
          <Route path="/admin/parts/{id:Int}/edit" page={PartEditPartPage} name="editPart" />
          <Route path="/admin/parts/{id:Int}" page={PartPartPage} name="part" />
          <Route path="/admin/parts" page={PartPartsPage} name="parts" />
        </Set>
      </Private>
      <Set wrap={NavbarLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
