import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";
import {Config} from "../../env.config.ts";

export const toAbsoluteUrl = (pathname: string) =>
  import.meta.env.BASE_URL + pathname;

export const toDevoltonAbsoluteUrl=(path:string)=> Config.PATH.SERVER.BASE_URL+path;

export const useIllustrationsPath = (illustrationName: string): string => {
  const { config } = useLayout();

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf("."),
    illustrationName.length
  );
  const illustration =
    ThemeModeComponent.getMode() === "dark"
      ? `${illustrationName.substring(
          0,
          illustrationName.lastIndexOf(".")
        )}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf("."));
  return toAbsoluteUrl(
    `media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
};
export const formatTimeAgo=(date: string): string =>{
  const now = new Date();
  const messageDate = new Date(date);
  const diffInMilliseconds = now.getTime() - messageDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // If the message was sent less than a minute ago
  if (diffInSeconds < 60) {
    return 'Just now';
  }

  // If the message was sent less than 1 hour ago
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  // If the message was sent less than 1 day ago
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  // If the message was sent yesterday
  if (diffInDays === 1) {
    return 'Yesterday';
  }

  // If the message was sent within the last 7 days
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  // Otherwise, display the full date
  return messageDate.toISOString().split('T')[0];  // Format: YYYY-MM-DD
}


