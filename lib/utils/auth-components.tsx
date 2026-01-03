// Shared form field component
export const FormField = ({ label, error, ...props }: any) => (
  <div>
    <label htmlFor={props.id} className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input {...props} className="input-field" />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
)

// Error alert component
export const ErrorAlert = ({ message }: { message: string }) => (
  <div className="mb-6 p-4 glass-dark border-red-300 rounded-glass" role="alert">
    <p className="text-red-700 font-medium">{message}</p>
  </div>
)

// Page layout wrapper
export const AuthLayout = ({ children, title, subtitle }: any) => (
  <div className="glass rounded-glass p-8">
    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent text-center">
      {title}
    </h1>
    <p className="text-gray-600 mb-8 text-center">{subtitle}</p>
    {children}
  </div>
)
