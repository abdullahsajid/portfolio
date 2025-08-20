import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownResponse = ({ content }) => {
	const [copied, setCopied] = useState(false);
	const [previewCode, setPreviewCode] = useState(false);

	const handleCopy = async (children) => {
		try {
			await navigator.clipboard.writeText(children);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return match ? (
						<>
							<div className='flex justify-end gap-3 pr-5'>
								<button
									className='px-5 py-2  max-[370px]:w-full bg-[#2B2B2B]  text-white  !text-xs sm:text-base font-semibold rounded'
									onClick={() => handleCopy(children)}>
									{copied ? 'Copied!' : 'Copy'}
								</button>
								{match[1] === 'html' && (
									<button
										className='px-5 py-2  max-[370px]:w-full bg-[#2B2B2B]  !text-xs sm:text-base  text-white font-semibold rounded'
										onClick={() => setPreviewCode(!previewCode)}>
										{previewCode ? 'Hide Preview' : 'Show Preview'}
									</button>
								)}
							</div>
							{previewCode ? (
								<iframe
									//   ref={iframeRef}
									className='w-full h-[700px] border-none rounded-none table-scrollbar'
									loading='lazy'
									srcDoc={String(children)}
								/>
							) : (
								<SyntaxHighlighter
									{...(props)}
									style={atomDark}
									customStyle={{
										margin: 0,
										borderRadius: '18px',
										width: '100%',
										overflow: 'auto',
										height: '100%',
										maxHeight: '100%',
										boxShadow: '1px 10px 76px -27px rgba(0,0,0,0.36)',
										border: '1px solid #e0e0e0',
									}}
									language={match[1]}
									PreTag='div'>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							)}
						</>
					) : (
						<code
							className={className}
							{...props}>
							{children}
						</code>
					);
				},

				ol: ({ node, ...props }) => (
					<ol
						className='list-decimal pl-6 space-y-2 my-4'
						{...props}
					/>
				),
				ul: ({ node, ...props }) => (
					<ul
						className='list-disc pl-6 space-y-2 my-4'
						{...props}
					/>
				),
				li: ({ node, children, ...props }) => {
						<li
							className={`text-base leading-relaxed`}
							{...props}>
							{children}
						</li>
				},
				h1: ({ node, ...props }) => (
					<h1
						className='text-2xl font-bold mb-4'
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						className='text-xl font-semibold mb-3'
						{...props}
					/>
				),
				a: ({ node, ...props }) => (
					<a
						className='text-blue-600 hover:underline'
						target='_blank'
						rel='noopener noreferrer'
						{...props}
					/>
				),
				table: ({ node, ...props }) => (
					<table
						className='w-full border-collapse border border-gray-300 my-4'
						{...props}
					/>
				),
				th: ({ node, ...props }) => (
					<th
						className='border border-gray-300 p-2 bg-gray-100'
						{...props}
					/>
				),
				td: ({ node, ...props }) => (
					<td
						className='border border-gray-300 p-2'
						{...props}
					/>
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className='border-l-4 border-gray-300 pl-4 italic my-4'
						{...props}
					/>
				),
			}}>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownResponse;