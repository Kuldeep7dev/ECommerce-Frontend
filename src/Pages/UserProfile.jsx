import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



const adminHighlights = [
  { label: 'Role', value: 'Administrator' },
  { label: 'Access', value: 'Full control' },
  { label: 'Status', value: 'Active account' },
]



const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Bravima || ${user?.fullName}`
  }, [])

  const displayName = user?.fullName || user?.name || 'Guest User'
  const email = user?.email || 'No email added yet'
  const role = user?.role || 'customer'
  const initial = displayName.charAt(0).toUpperCase()

  const profileActions = [
    {
      title: 'Saved addresses',
      description: user?.shippingAddress
        ? `${user.shippingAddress.street}, ${user.shippingAddress.city}, ${user.shippingAddress.state} - ${user.shippingAddress.postalCode}, ${user.shippingAddress.country}`
        : 'Manage your default delivery location for a faster checkout.',
      label: 'Manage address',
      to: '/user/address-update',
    },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary text-secondary px-6 py-24">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-secondary/20 bg-secondary p-10 text-primary shadow-[0_30px_80px_rgba(16,16,14,0.12)]">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">Profile</p>
            <h1 className="mt-4 text-4xl font-black">Sign in to view your space</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-primary/70">
              Your profile dashboard shows account details, shortcuts, and role-based actions once
              you are logged in.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-secondary transition-transform duration-300 hover:-translate-y-0.5"
              >
                Go to login
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-primary/20 px-6 py-3 text-sm font-bold text-primary transition-colors duration-300 hover:bg-primary hover:text-secondary"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-primary text-secondary sm:px-8 lg:px-12">

      <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-28 lg:flex-row lg:items-stretch">
        <section className="relative overflow-hidden rounded-[32px] border border-secondary/15 bg-secondary p-8 text-primary shadow-[0_30px_80px_rgba(16,16,14,0.12)] lg:w-[420px]">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/15 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">My profile</p>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-primary text-3xl font-black text-secondary shadow-lg">
                {initial}
              </div>

              <div>
                <h1 className="text-3xl font-black capitalize">{displayName}</h1>
                <p className="mt-2 text-sm font-medium capitalize text-primary/70">{role}</p>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-primary/10 bg-primary/5 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/55">Email</p>
              <p className="mt-2 break-all text-sm font-semibold">{email}</p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {(role === 'admin'
                ? adminHighlights
                : adminHighlights.filter((item) => item.label !== 'Role')
              ).map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-primary/10 bg-white/60 px-4 py-4"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex-1 rounded-[32px] border border-secondary/15 bg-secondary p-8 text-primary shadow-[0_30px_80px_rgba(16,16,14,0.12)]">
          <div className="flex flex-col gap-4 border-b border-primary/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">Overview</p>
              <h2 className="mt-3 text-3xl font-black">
                {role === 'admin' ? 'Control center' : 'Your account hub'}
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-primary/70">
              {role === 'admin'
                ? 'Manage store operations, review important account details, and move quickly into the dashboard from one focused space.'
                : 'Keep your account tidy, jump into common tasks, and stay connected to the parts of the store you use the most.'}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-1"> {/* width full, same height */}
            {profileActions.map((action, index) => (
              <div
                key={action.title}
                className={`w-full rounded-[28px] border p-6 transition-transform duration-300 hover:-translate-y-1 ${index === 0
                  ? 'border-accent/20 bg-accent/10'
                  : 'border-primary/10 bg-primary/5'
                  }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/55">
                  Quick action
                </span>

                <h3 className="mt-4 text-xl font-black">{action.title}</h3>

                <p className="mt-3 text-sm leading-7 text-primary/70">
                  {action.description}
                </p>

                <Link
                  to={action.to}
                  className={`mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 cursor-pointer ${index === 0
                    ? 'bg-primary text-secondary hover:bg-accent'
                    : 'border border-primary/15 hover:bg-primary hover:text-secondary'
                    }`}
                >
                  {action.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-primary/10 bg-primary/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/55">
                  Session
                </p>
                <h3 className="mt-3 text-2xl font-black">Need to switch accounts?</h3>
                <p className="mt-2 text-sm leading-7 text-primary/70">
                  End the current session safely and return to the store home page.
                </p>
              </div>

              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="rounded-full cursor-pointer bg-primary px-6 py-3 text-sm font-bold text-secondary transition-all duration-300 hover:bg-accent"
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserProfile
