import {
  Content,
  fetchOneEntry,
  isPreviewing,
  isEditing,
} from "@builder.io/sdk-react";

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

// Builder.io API key - use environment variable
const BUILDER_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!;

export default async function BuilderPage(props: PageProps) {
  // NOTE: This import MUST be inside the Page component
  const { initializeNodeRuntime } = await import(
    "@builder.io/sdk-react/node/init"
  );
  initializeNodeRuntime();

  const urlPath = "/builder/" + (props.params?.slug?.join("/") || "");

  const content = await fetchOneEntry({
    options: props.searchParams,
    apiKey: BUILDER_PUBLIC_API_KEY,
    model: "page",
    userAttributes: { urlPath },
  });

  const canShowContent =
    content ||
    isPreviewing(props.searchParams) ||
    isEditing(props.searchParams);

  if (!canShowContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            صفحة Builder.io
          </h1>
          <p className="text-gray-600 mb-4">
            تأكد من نشر المحتوى في Builder.io للمسار:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">{urlPath}</code>
          </p>
          <p className="text-sm text-gray-500">
            أو تأكد من إعداد API Key في ملف .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <Content content={content} apiKey={BUILDER_PUBLIC_API_KEY} model={"page"} />
  );
}
