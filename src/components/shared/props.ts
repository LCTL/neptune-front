export interface CommonProps {
  //key?: any,
  children?: any
}

export interface StyleableProps extends CommonProps {
  className?: string
}

export interface MachineProps extends CommonProps {
  machineName: string
}

export interface MachineStyleableProps extends StyleableProps, MachineProps {

}

export interface LinkProps extends StyleableProps {
  to: string
}

export interface ActiveLinkProps extends CommonProps {
  router: any,
  to: string
}

export interface IconProps extends CommonProps {
  icon?: string
}

export interface MachineContainerProps extends MachineProps {
  containerId: string
}

export interface MachineContainerStyleableProps extends MachineContainerProps, StyleableProps {

}

export interface StartMachineContainerActionProps extends CommonProps {
  startMachineContainer: (machineName: string, containerId: string, options?: any) => void
}

export interface StopMachineContainerActionProps extends CommonProps {
  stopMachineContainer: (machineName: string, containerId: string, options?: any) => void
}

export interface RemoveMachineContainerActionProps extends CommonProps {
  removeMachineContainer: (machineName: string, containerId: string, options?: any) => void
}
