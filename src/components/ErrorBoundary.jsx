import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="px-6 py-24 text-center" role="alert">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Something went wrong</h2>
          <p className="text-text-secondary text-xs font-sans tracking-wider uppercase mb-6">An unexpected error occurred.</p>
          <Link to="/" className="text-amber hover:text-amber-pale transition-colors text-xs tracking-wider uppercase font-sans">Return home</Link>
        </section>
      )
    }
    return this.props.children
  }
}
