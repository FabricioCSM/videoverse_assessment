import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faCheck,
  faX,
  faCommentDots,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications } from "@/http/getAllNotifications";
import { NotificationInterface } from "@/@interface/notification.interface";
import NotificationType from "./NotificationType.component";
import { Button } from "./ui/button";
import NotificationDate from "./NotificationDate.component";

const MenuBar = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      return true;
    },
    onMutate: () => {
      queryClient.setQueryData(
        ["notifications"],
        (oldData: NotificationInterface[] | undefined) => {
          if (!oldData) return [];

          return oldData.map((notification) => ({
            ...notification,
            read: true,
          }));
        }
      );
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      id,
      reply,
      read,
    }: {
      id: string;
      reply: string;
      read: boolean;
    }) => {
      return { id, reply, read };
    },

    onMutate: (variables) => {
      const { id, reply, read } = variables;
      queryClient.setQueryData(
        ["notifications"],
        (oldData: NotificationInterface[] | undefined) => {
          if (!oldData) return [];

          return reply === "accept"
            ? oldData.map((notification) =>
                notification.id === id
                  ? {
                      ...notification,
                      type: "follow_update_accept",
                      read: true,
                    }
                  : notification
              )
            : oldData.map((notification) =>
                notification.id === id
                  ? {
                      ...notification,
                      type: "follow_update_reject",
                      read: true,
                    }
                  : notification
              );
        }
      );
    },
  });

  return (
    <Menubar className="p-10">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-slate-200 mr-1">
          <FontAwesomeIcon
            icon={faUser}
            className="fa-2x hover:text-blue-500 transition-colors duration-100 mr-1"
          />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-slate-200 mr-1">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="fa-2x hover:text-blue-500 transition-colors duration-100 mr-1"
          />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-slate-200 mr-1">
          <FontAwesomeIcon
            icon={faBell}
            className="fa-2x hover:text-blue-500 transition-colors duration-100"
          />
        </MenubarTrigger>
        <MenubarContent className="p-4">
          <div className="flex flex-row justify-between">
            <h2 className="font-bold mb-3">Notifications</h2>
            <p className="mr-4">...</p>
          </div>
          <div className="flex flex-row mt-[-10px] items-center">
            <p className="bg-blue-200 p-1 pl-2 pr-2 rounded-xl mb-4 mr-5 cursor-pointer">
              All
            </p>
            <p className="rounded-xl mb-4 cursor-pointer">Unread</p>
          </div>
          <div>
            <div className="p-4 bg-gray-200 rounded-sm">
              <div className="flex flex-row justify-between">
                <p className="font-bold">Your push notifications are off</p>
                <p className="cursor-pointer">X</p>
              </div>
              <p className="text-xs">Turn on notifications to stay connected</p>
              <div className="flex flex-row justify-around mt-6">
                <Button className="hover:bg-blue-50 hover:text-black">
                  Turn on
                </Button>
                <Button className="hover:bg-red-400 hover:text-black">
                  Not now
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <p className="font-bold mb-3">New</p>
            <p
              className="text-blue-400 mr-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                markAllAsRead.mutate();
              }}
            >
              See all
            </p>
          </div>
          {data?.map((notification: NotificationInterface) => {
            return (
              <MenubarItem key={notification.id}>
                <div>
                  <div className="flex flex-row p-5">
                    {notification.read === false && (
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3" />
                    )}
                    <FontAwesomeIcon icon={faUser} />
                    <p className="ml-2 mr-1 font-bold">
                      {notification.username}{" "}
                    </p>
                    <NotificationType type={notification.type} />
                    <br />
                  </div>
                  <div className="mt-[-20px] ml-4">
                    <NotificationDate date={notification.created_at} />
                  </div>
                </div>
                {notification.type === "friend_request" && (
                  <div className="flex flex-row justify-between">
                    <div className="p-2">
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faCheck}
                        onClick={(e) => {
                          e.stopPropagation();
                          mutate({
                            id: notification.id,
                            reply: "accept",
                            read: true,
                          });
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faX}
                        onClick={(e) => {
                          e.stopPropagation();
                          mutate({
                            id: notification.id,
                            reply: "reject",
                            read: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-slate-200 mr-1">
          <FontAwesomeIcon
            icon={faGrip}
            className="fa-2x hover:text-blue-500 transition-colors duration-100 mr-1"
          />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBar;
