export interface CommonProps {
  key?: any,
  children? :any
}

export interface StyleableProps extends CommonProps {
  className?: string
}

export interface MachineProps extends CommonProps {
  machineName: string
}

export interface MachineStyleableProps extends StyleableProps, MachineProps {

}

export interface ActiveLinkProps {
  to: string,
  route: any
}

export interface IconProps extends CommonProps {
  icon?: string
}
