import { projects, type Project } from "@/data/projects";

/**
 * Refreshes star counts at build time.
 *
 * Unauthenticated GitHub API calls are rate-limited per IP, and CI runners share
 * addresses, so this authenticates with GITHUB_TOKEN when one is present and
 * falls back to the counts baked into src/data/projects.ts otherwise. A stale
 * star count is never worth a failed build.
 */
export async function getProjectsWithStars(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;

  const results = await Promise.all(
    projects.map(async (project) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/devroopsaha744/${project.repo}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "User-Agent": "devroop-portfolio/1.0",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            next: { revalidate: 3600 },
          },
        );
        if (!res.ok) throw new Error(`${project.repo}: ${res.status}`);

        const data = (await res.json()) as { stargazers_count?: number };
        if (typeof data.stargazers_count !== "number") throw new Error("no count");

        return { ...project, stars: data.stargazers_count };
      } catch (error) {
        console.warn(`[github] using baked star count: ${(error as Error).message}`);
        return project;
      }
    }),
  );

  return results;
}
