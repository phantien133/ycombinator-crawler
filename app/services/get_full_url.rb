class GetFullUrl < ServiceBase
  def execute(href, url)
    return if href.blank?
    uri = URI(href)
    return href if uri.host.present?
    return if url.blank?
    path = uri.path
    path = path[1..-1] if path[0] == '/'
    [URI.join(url, '/').to_s, path].join
  end
end
