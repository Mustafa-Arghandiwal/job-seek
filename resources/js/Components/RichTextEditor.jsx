// import BulletList from '@tiptap/extension-bullet-list'
// import ListItem from '@tiptap/extension-list-item'
// import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import { LinkIcon } from "../utils/svgs"
import ToolTip from './ToolTip'

const MenuBar = (props) => {
    const { editor } = useCurrentEditor()



    if (!editor) {
        return null
    }

    const [linkHovered, setLinkHovered] = useState(false)

    return (
        <div className={`${props.menuOnTop && "border-b  border-customGray-100 "}  flex px-3  gap-1 overflow-x-auto sm:overflow-x-visible  scroll-smooth snap-x snap-mandatory [scrollbar-width:none]`}>
            <button type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`flex-none snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50 ${editor.isActive('bold') ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                <img src='/bold.png' />
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`flex-none snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50${editor.isActive('italic') ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                <img src='/italic.png' />
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`flex-none snap-center  p-2 cursor-pointer rounded-sm hover:bg-customGray-50${editor.isActive('underline') ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                <img src='/underline.png' />
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50${editor.isActive('strike') ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                <img src='/strikethrough.png' />
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm  text-customGray-400 hover:bg-customGray-50${editor.isActive('heading', { level: 1 }) ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                H<sub>1</sub>
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm  text-customGray-400 hover:bg-customGray-50${editor.isActive('heading', { level: 2 }) ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                H<sub>2</sub>
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm  text-customGray-400 hover:bg-customGray-50${editor.isActive('heading', { level: 3 }) ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                H<sub>3</sub>
            </button>

            <button
                type="button"
                onClick={() => {
                    let url = window.prompt('Type or paste a link:')
                    if (url === null || url.trim() === '') return
                    if (!/^https?:\/\//i.test(url)) {
                        url = 'https://' + url
                    }
                    editor.commands.setLink({ href: url, target: '_blank'})
                }}
                onMouseOver={() => setLinkHovered(true)}
                onMouseLeave={() => setLinkHovered(false)}
                className={`relative flex-none snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50 ${editor.isActive('link') ? 'bg-customGray-100' : ''}`}
            >
                <LinkIcon className='text-customGray-400' />
                    <ToolTip text="Select the text you want, then click here to add a link"
                    className={`${linkHovered ? "opacity-100" : "opacity-0 pointer-events-none"} -top-18 duration-200 bg-customGray-900/90 rounded-sm text-xs font-light text-white p-2 w-30`} />
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50${editor.isActive('bulletList') ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                <img src='/ListDashes.png' />
            </button>

            <button type='button'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50${editor.isActive('orderedList') ? 'hover:bg-customGray-100 bg-customGray-100' : ''}`}
            >
                <img src='/ListNumbers.png' />
            </button>


            <button type='button'
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={`flex-none  snap-center p-2 cursor-pointer rounded-sm hover:bg-customGray-50`}
            >
                <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='#767F8C' fillRule="evenodd" d="M2 12.75a.75.75 0 01.75-.75h18.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" /></svg>
            </button>

        </div>
    )
}

// const extensions = [StarterKit, Underline]


export default (props) => {
    const editorSlot = props.menuOnTop ? { slotBefore: <MenuBar menuOnTop={true} /> } : { slotAfter: <MenuBar menuOnTop={false} /> }
    const [key, setKey] = useState(0)
    useEffect(() => {
        if (props.content === '') {
            setKey(prev => prev + 1)
        }
    }, [props.content])
    return (
        <div className={`border mt-2 ${props.menuOnTop && " overflow-y-auto scrollbar-custom pb-6 max-h-44"} border-customGray-100 text-customGray-900 text-sm sm:text-base rounded-md `}>
            <EditorProvider
                key={key}
                {...editorSlot}
                extensions={[StarterKit, Underline, Placeholder.configure({
                    placeholder: props.placeholder,
                }),
                    Link.configure({
                        autolink: false,
                        defaultProtocol: 'https',
                        HTMLAttributes: {
                            class: 'text-primary-500 underline cursor-pointer',
                        }
                    })
                ]}
                content={props.content}
                editorProps={{
                    attributes: {
                        //this is to style this in app.css, mainly for ol and ul, coz tailwind doesn't show'em by default
                        class: 'editor-content'
                    }
                }}
                onUpdate={({ editor }) => {
                    props.onChange(editor.getHTML())
                }}
            >
            </EditorProvider>
        </div >
    )
}
