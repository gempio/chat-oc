import { Context } from 'oc-template-typescript-react-compiler';

export type Environment = 'local' | 'ci' | 'stage' | 'prod-eu1' | 'prod-asia';

export interface FeedbackData {
  rating: number;
  comments?: string;
}

export interface OcParameters {
  siteId: string;
  lang: string;
  env: Environment;
}

export interface ClientProps extends OcParameters {
  instrumentationKey: string;
}

export interface GuestlineContext extends Context<OcParameters> {}

export type Callback = (error: Error | null, data?: ClientProps) => void;
export type GetData = (data: OcParameters, callback: Callback) => void;
