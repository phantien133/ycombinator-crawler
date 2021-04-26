class LoadNew < ServiceBase
  include CacheHelper

  def execute(id:, link:)
    form_cache_or_execute(id) do
      Crawler::CrawMetaPost.execute(url: link)
    end
  end
end
