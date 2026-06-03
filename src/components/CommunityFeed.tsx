"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Post = {
  id: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  author: { id: string; name: string; image?: string | null };
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
};

export function CommunityFeed({
  initialPosts,
  currentUserId,
  currentUserName,
  currentUserImage,
}: {
  initialPosts: Post[];
  currentUserId: string;
  currentUserName: string;
  currentUserImage?: string | null;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [posting, startPosting] = useTransition();

  async function handlePost() {
    if (!newPost.trim()) return;
    startPosting(async () => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost }),
      });
      if (res.ok) {
        const post = await res.json();
        setPosts((prev) => [post, ...prev]);
        setNewPost("");
      }
    });
  }

  async function handleLike(postId: string) {
    const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    if (res.ok) {
      const { liked } = await res.json();
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, likedByMe: liked, likesCount: liked ? p.likesCount + 1 : p.likesCount - 1 }
            : p
        )
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Compose */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
        <div className="flex gap-3">
          <Avatar name={currentUserName} image={currentUserImage} size={36} />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="¿Qué aprendiste hoy?"
              rows={3}
              className="w-full text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none leading-relaxed"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handlePost}
                disabled={posting || !newPost.trim()}
                className="bg-black text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {posting ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-300 text-4xl mb-4">✦</p>
          <p className="text-gray-400 text-sm">Sé el primero en publicar algo</p>
        </div>
      )}
    </div>
  );
}

function PostCard({ post, onLike }: { post: Post; onLike: (id: string) => void }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={post.author.name} image={post.author.image} size={36} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: es })}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

      {/* Image */}
      {post.imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-4 bg-gray-50">
          <img src={post.imageUrl} alt="" className="w-full object-cover max-h-80" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 text-sm transition-all ${
            post.likedByMe ? "text-red-500 font-semibold" : "text-gray-400 hover:text-red-500"
          }`}
        >
          <HeartIcon filled={post.likedByMe} />
          <span>{post.likesCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <CommentIcon />
          <span>{post.commentsCount}</span>
        </button>
      </div>
    </article>
  );
}

function Avatar({ name, image, size = 36 }: { name: string; image?: string | null; size?: number }) {
  return (
    <div
      className="rounded-full bg-gray-900 overflow-hidden flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-bold" style={{ fontSize: size * 0.38 }}>
          {name?.[0]?.toUpperCase() || "A"}
        </span>
      )}
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
