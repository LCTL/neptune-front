import { PathInfo } from './interfaces';

const PATH_INFOS: PathInfo[] = [
  {
    path: /^\/$/,
    label: 'Home'
  },
  {
    path: /^\/create-machine$/,
    label: 'Create Machine'
  },
  {
    path: /^\/machines$/,
    label: 'Machines'
  },
  {
    path: /^\/machines\/[a-zA-Z0-9]+$/,
    dynamicLabel: (route) => route.params.machineName
  },
  {
    path: /^\/machines\/[a-zA-Z0-9]+\/containers$/,
    label: 'Containers'
  },
  {
    path: /^\/machines\/[a-zA-Z0-9]+\/create-container$/,
    label: 'Create Container'
  },
  {
    path: /^\/machines\/[a-zA-Z0-9]+\/images$/,
    label: 'Images'
  },
  {
    path: /^\/machines\/[a-zA-Z0-9]+\/pull-image$/,
    label: 'Pull Image'
  },
  {
    path: /^\/containers$/,
    label: 'Containers'
  },
  {
    path: /^\/images$/,
    label: 'Images'
  }
];

export default PATH_INFOS;
