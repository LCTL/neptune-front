export const hostUrlFnFactory
  = (machineIp: string) => (hostPort: string) => `http://${machineIp}:${hostPort}`

export const machineContainerDetailPathFnFactory
  = (machineName: string) =>
    (containerId: string) => `/machines/${machineName}/containers/${containerId}/info`

export const localContainerDetailPathFnFactory
  = () => (containerId: string) => `/containers/${containerId}/info`
