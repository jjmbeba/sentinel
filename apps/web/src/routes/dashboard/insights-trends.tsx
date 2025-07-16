import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/insights-trends')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/insights-trends"!</div>
}
