import { Editor } from "@tiptap/react";
import ToolbarIcon from "./ToolbarIcon";

type Props = {
  editor: Editor;
};

const cf = (editor: Editor) => editor.chain().focus();
const th = (editor: Editor, level: 1 | 2 | 3 | 4) =>
  cf(editor).toggleHeading({ level }).run();

const Toolbar: React.FC<Props> = ({ editor }) => {
  if (!editor.isEditable) return null;

  return (
    <div className="dark:bg-dark-100 sticky top-0 z-10 my-2 flex flex-wrap items-center gap-x-4 gap-y-2 bg-white py-2 sm:my-4 md:my-6">
      <div className="flex flex-wrap items-center gap-2">
        <ToolbarIcon
          isActive={editor.isActive("paragraph")}
          onClick={() => cf(editor).setParagraph().run()}
        >
          <span className="sr-only">set to paragraph</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M19.252 10.488C19.252 11.764 18.812 12.8273 17.932 13.678C17.0667 14.514 15.7393 14.932 13.95 14.932H11.002V21.334H9V6H13.95C15.6807 6 16.9933 6.418 17.888 7.254C18.7973 8.09 19.252 9.168 19.252 10.488ZM13.95 13.282C15.0647 13.282 15.886 13.04 16.414 12.556C16.942 12.072 17.206 11.3827 17.206 10.488C17.206 8.596 16.1207 7.65 13.95 7.65H11.002V13.282H13.95Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
        <ToolbarIcon
          isActive={editor.isActive("heading", { level: 2 })}
          onClick={() => th(editor, 2)}
        >
          <span className="sr-only">set to heading level 2</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M12.814 6.858V22.192H10.812V15.24H3.002V22.192H1V6.858H3.002V13.59H10.812V6.858H12.814Z"
              fill="inherit"
            />
            <path
              d="M15.6604 20.586C17.5231 19.09 18.9824 17.8653 20.0384 16.912C21.0944 15.944 21.9818 14.9393 22.7004 13.898C23.4338 12.842 23.8004 11.808 23.8004 10.796C23.8004 9.84267 23.5658 9.09467 23.0964 8.552C22.6418 7.99467 21.9011 7.716 20.8744 7.716C19.8771 7.716 19.0998 8.03133 18.5424 8.662C17.9998 9.278 17.7064 10.1067 17.6624 11.148H15.7264C15.7851 9.50533 16.2838 8.23667 17.2224 7.342C18.1611 6.44733 19.3711 6 20.8524 6C22.3631 6 23.5584 6.418 24.4384 7.254C25.3331 8.09 25.7804 9.24133 25.7804 10.708C25.7804 11.9253 25.4138 13.1133 24.6804 14.272C23.9618 15.416 23.1404 16.428 22.2164 17.308C21.2924 18.1733 20.1118 19.1853 18.6744 20.344H26.2424V22.016H15.6604V20.586Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>

        <ToolbarIcon
          isActive={editor.isActive("heading", { level: 3 })}
          onClick={() => th(editor, 3)}
        >
          <span className="sr-only">set to heading level 3</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M12.814 6.88V22.214H10.812V15.262H3.002V22.214H1V6.88H3.002V13.612H10.812V6.88H12.814Z"
              fill="inherit"
            />
            <path
              d="M15.8584 10.312C15.9611 8.96267 16.4818 7.90667 17.4204 7.144C18.3591 6.38133 19.5764 6 21.0724 6C22.0698 6 22.9278 6.18333 23.6464 6.55C24.3798 6.902 24.9298 7.386 25.2964 8.002C25.6778 8.618 25.8684 9.31467 25.8684 10.092C25.8684 11.0013 25.6044 11.786 25.0764 12.446C24.5631 13.106 23.8884 13.5313 23.0524 13.722V13.832C24.0058 14.0667 24.7611 14.5287 25.3184 15.218C25.8758 15.9073 26.1544 16.8093 26.1544 17.924C26.1544 18.76 25.9638 19.5153 25.5824 20.19C25.2011 20.85 24.6291 21.3707 23.8664 21.752C23.1038 22.1333 22.1871 22.324 21.1164 22.324C19.5618 22.324 18.2858 21.9207 17.2884 21.114C16.2911 20.2927 15.7338 19.134 15.6164 17.638H17.5524C17.6551 18.518 18.0144 19.2367 18.6304 19.794C19.2464 20.3513 20.0678 20.63 21.0944 20.63C22.1211 20.63 22.8984 20.366 23.4264 19.838C23.9691 19.2953 24.2404 18.5987 24.2404 17.748C24.2404 16.648 23.8738 15.856 23.1404 15.372C22.4071 14.888 21.2998 14.646 19.8184 14.646H19.3124V12.974H19.8404C21.1898 12.9593 22.2091 12.7393 22.8984 12.314C23.5878 11.874 23.9324 11.1993 23.9324 10.29C23.9324 9.51267 23.6758 8.88933 23.1624 8.42C22.6638 7.95067 21.9451 7.716 21.0064 7.716C20.0971 7.716 19.3638 7.95067 18.8064 8.42C18.2491 8.88933 17.9191 9.52 17.8164 10.312H15.8584Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
        <ToolbarIcon
          isActive={editor.isActive("heading", { level: 4 })}
          onClick={() => th(editor, 4)}
        >
          <span className="sr-only">set to heading level 4</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M12.814 6.418V21.752H10.812V14.8H3.002V21.752H1V6.418H3.002V13.15H10.812V6.418H12.814Z"
              fill="inherit"
            />
            <path
              d="M15.4184 18.21V16.692L23.1404 6H25.5384V16.472H27.7384V18.21H25.5384V21.752H23.5584V18.21H15.4184ZM23.6464 8.09L17.7284 16.472H23.6464V8.09Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
        <ToolbarIcon
          isActive={editor.isActive("link")}
          onClick={() => editor.commands.toggleLinkModal()}
        >
          <span className="sr-only">create link</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M15.11 5C16.738 5 18.1533 5.308 19.356 5.924C20.5587 6.54 21.4827 7.40533 22.128 8.52C22.7733 9.62 23.096 10.896 23.096 12.348C23.096 13.5067 22.9053 14.6213 22.524 15.692C22.1427 16.748 21.5853 17.606 20.852 18.266C20.1333 18.926 19.29 19.256 18.322 19.256C17.5887 19.256 17.024 19.0727 16.628 18.706C16.232 18.3393 16.0047 17.8407 15.946 17.21C15.4913 17.8407 14.912 18.3393 14.208 18.706C13.5187 19.0727 12.7853 19.256 12.008 19.256C10.8933 19.256 10.0133 18.9187 9.368 18.244C8.73733 17.5547 8.422 16.6307 8.422 15.472C8.422 14.372 8.64933 13.3453 9.104 12.392C9.57333 11.4387 10.2187 10.676 11.04 10.104C11.8613 9.51733 12.7927 9.224 13.834 9.224C15.2273 9.224 16.166 9.752 16.65 10.808L16.892 9.444H18.63L17.53 15.802C17.486 16.0807 17.464 16.3373 17.464 16.572C17.464 17.452 17.8527 17.892 18.63 17.892C19.2167 17.892 19.7227 17.6133 20.148 17.056C20.588 16.4987 20.918 15.802 21.138 14.966C21.358 14.1153 21.468 13.2793 21.468 12.458C21.468 10.5367 20.8887 9.048 19.73 7.992C18.586 6.936 16.9653 6.408 14.868 6.408C13.1227 6.408 11.546 6.83333 10.138 7.684C8.74467 8.52 7.652 9.67133 6.86 11.138C6.068 12.6047 5.672 14.2253 5.672 16C5.65733 17.936 6.23667 19.4247 7.41 20.466C8.58333 21.522 10.2113 22.05 12.294 22.05C13.6727 22.05 14.89 21.8007 15.946 21.302L16.21 22.666C14.9047 23.2087 13.4673 23.48 11.898 23.48C10.3287 23.48 8.94267 23.1793 7.74 22.578C6.552 21.9913 5.628 21.1407 4.968 20.026C4.32267 18.926 4 17.6427 4 16.176C4 14.108 4.47667 12.2233 5.43 10.522C6.38333 8.806 7.70333 7.45667 9.39 6.474C11.0913 5.49133 12.998 5 15.11 5ZM12.602 17.694C13.262 17.694 13.8707 17.5033 14.428 17.122C14.9853 16.726 15.4253 16.198 15.748 15.538C16.0707 14.8633 16.232 14.13 16.232 13.338C16.232 12.5753 16.0193 11.9593 15.594 11.49C15.1833 11.006 14.5967 10.764 13.834 10.764C13.13 10.764 12.5067 10.9767 11.964 11.402C11.436 11.8127 11.0253 12.3627 10.732 13.052C10.4387 13.7267 10.292 14.4307 10.292 15.164C10.292 15.9413 10.49 16.5573 10.886 17.012C11.282 17.4667 11.854 17.694 12.602 17.694Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
      </div>

      <div className="flex gap-2">
        <ToolbarIcon
          isActive={editor.isActive("bulletList")}
          onClick={() => cf(editor).toggleBulletList().run()}
        >
          <span className="sr-only">make into unordered-list</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M5.002 6V15.702C5.002 17.066 5.332 18.078 5.992 18.738C6.66667 19.398 7.598 19.728 8.786 19.728C9.95933 19.728 10.876 19.398 11.536 18.738C12.2107 18.078 12.548 17.066 12.548 15.702V6H14.55V15.68C14.55 16.956 14.2933 18.034 13.78 18.914C13.2667 19.7793 12.57 20.4247 11.69 20.85C10.8247 21.2753 9.84933 21.488 8.764 21.488C7.67867 21.488 6.696 21.2753 5.816 20.85C4.95067 20.4247 4.26133 19.7793 3.748 18.914C3.24933 18.034 3 16.956 3 15.68V6H5.002Z"
              fill="inherit"
            />
            <path
              d="M19.8917 19.706H25.2597V21.334H17.8897V6H19.8917V19.706Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
        <ToolbarIcon
          isActive={editor.isActive("orderedList")}
          onClick={() => cf(editor).toggleOrderedList().run()}
        >
          <span className="sr-only">make into ordered-list</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M8.7 21.664C7.27733 21.664 5.97933 21.334 4.806 20.674C3.63267 19.9993 2.70133 19.068 2.012 17.88C1.33733 16.6773 1 15.328 1 13.832C1 12.336 1.33733 10.994 2.012 9.806C2.70133 8.60333 3.63267 7.672 4.806 7.012C5.97933 6.33733 7.27733 6 8.7 6C10.1373 6 11.4427 6.33733 12.616 7.012C13.7893 7.672 14.7133 8.596 15.388 9.784C16.0627 10.972 16.4 12.3213 16.4 13.832C16.4 15.3427 16.0627 16.692 15.388 17.88C14.7133 19.068 13.7893 19.9993 12.616 20.674C11.4427 21.334 10.1373 21.664 8.7 21.664ZM8.7 19.926C9.77067 19.926 10.7313 19.6767 11.582 19.178C12.4473 18.6793 13.122 17.968 13.606 17.044C14.1047 16.12 14.354 15.0493 14.354 13.832C14.354 12.6 14.1047 11.5293 13.606 10.62C13.122 9.696 12.4547 8.98467 11.604 8.486C10.7533 7.98733 9.78533 7.738 8.7 7.738C7.61467 7.738 6.64667 7.98733 5.796 8.486C4.94533 8.98467 4.27067 9.696 3.772 10.62C3.288 11.5293 3.046 12.6 3.046 13.832C3.046 15.0493 3.288 16.12 3.772 17.044C4.27067 17.968 4.94533 18.6793 5.796 19.178C6.66133 19.6767 7.62933 19.926 8.7 19.926Z"
              fill="inherit"
            />
            <path
              d="M21.0449 19.882H26.4129V21.51H19.0429V6.176H21.0449V19.882Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
      </div>

      <div className="flex gap-2">
        <ToolbarIcon
          isActive={editor.isActive("italic")}
          onClick={() => cf(editor).toggleItalic().run()}
        >
          <span className="sr-only">apply italic</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M16.808 6L14.102 21.356H11L13.728 6H16.808Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
        <ToolbarIcon
          isActive={editor.isActive("bold")}
          onClick={() => cf(editor).toggleBold().run()}
        >
          <span className="sr-only">apply bold</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M16.712 13.48C17.5773 13.6413 18.2887 14.074 18.846 14.778C19.4033 15.482 19.682 16.2887 19.682 17.198C19.682 18.0193 19.4767 18.7453 19.066 19.376C18.67 19.992 18.0907 20.476 17.328 20.828C16.5653 21.18 15.6633 21.356 14.622 21.356H8V6H14.336C15.3773 6 16.272 6.16867 17.02 6.506C17.7827 6.84333 18.3547 7.31267 18.736 7.914C19.132 8.51533 19.33 9.19733 19.33 9.96C19.33 10.8547 19.088 11.6027 18.604 12.204C18.1347 12.8053 17.504 13.2307 16.712 13.48ZM11.08 12.336H13.896C14.6293 12.336 15.194 12.1747 15.59 11.852C15.986 11.5147 16.184 11.038 16.184 10.422C16.184 9.806 15.986 9.32933 15.59 8.992C15.194 8.65467 14.6293 8.486 13.896 8.486H11.08V12.336ZM14.182 18.848C14.93 18.848 15.5093 18.672 15.92 18.32C16.3453 17.968 16.558 17.4693 16.558 16.824C16.558 16.164 16.338 15.6507 15.898 15.284C15.458 14.9027 14.864 14.712 14.116 14.712H11.08V18.848H14.182Z"
              fill="inherit"
            />
          </svg>
        </ToolbarIcon>
        <ToolbarIcon
          isActive={editor.isActive("strike")}
          onClick={() => cf(editor).toggleStrike().run()}
        >
          <span className="sr-only">apply strike-through</span>
          <svg aria-hidden width="100%" viewBox="0 0 27 27" fill="currentColor">
            <path
              d="M14.556 21.686C13.544 21.686 12.6347 21.51 11.828 21.158C11.036 20.7913 10.4127 20.2927 9.958 19.662C9.50333 19.0167 9.26867 18.276 9.254 17.44H11.388C11.4613 18.1587 11.7547 18.7673 12.268 19.266C12.796 19.75 13.5587 19.992 14.556 19.992C15.5093 19.992 16.2573 19.7573 16.8 19.288C17.3573 18.804 17.636 18.188 17.636 17.44C17.636 16.8533 17.4747 16.3767 17.152 16.01C16.8293 15.6433 16.426 15.3647 15.942 15.174C15.458 14.9833 14.8053 14.778 13.984 14.558C12.972 14.294 12.158 14.03 11.542 13.766C10.9407 13.502 10.42 13.0913 9.98 12.534C9.55467 11.962 9.342 11.1993 9.342 10.246C9.342 9.41 9.55467 8.66933 9.98 8.024C10.4053 7.37867 10.9993 6.88 11.762 6.528C12.5393 6.176 13.4267 6 14.424 6C15.8613 6 17.0347 6.35933 17.944 7.078C18.868 7.79667 19.3887 8.75 19.506 9.938H17.306C17.2327 9.35133 16.9247 8.838 16.382 8.398C15.8393 7.94333 15.1207 7.716 14.226 7.716C13.39 7.716 12.708 7.936 12.18 8.376C11.652 8.80133 11.388 9.40267 11.388 10.18C11.388 10.7373 11.542 11.192 11.85 11.544C12.1727 11.896 12.5613 12.1673 13.016 12.358C13.4853 12.534 14.138 12.7393 14.974 12.974C15.986 13.2527 16.8 13.5313 17.416 13.81C18.032 14.074 18.56 14.492 19 15.064C19.44 15.6213 19.66 16.384 19.66 17.352C19.66 18.1 19.462 18.804 19.066 19.464C18.67 20.124 18.0833 20.6593 17.306 21.07C16.5287 21.4807 15.612 21.686 14.556 21.686Z"
              fill="inherit"
            />
            <path d="M8 14.316H20.914V15.416H8V14.316Z" fill="inherit" />
          </svg>
        </ToolbarIcon>
      </div>
    </div>
  );
};

export default Toolbar;
