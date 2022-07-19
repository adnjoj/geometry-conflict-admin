import type { PathRenderData } from './PathRenderData';
import type { ImageRenderData } from './ImageRenderData';
import type { RectangleRenderData } from './RectangleRenderData';
import type { PointRenderData } from './PointRenderData';

export type RenderData =
  | ImageRenderData
  | RectangleRenderData
  | PathRenderData
  | PointRenderData;
