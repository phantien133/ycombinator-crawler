class Crawler::CrawMetaPost < Crawler::Base
  SOCIAL_TAG = %w(twitter fb og).freeze

  def execute!(url)
    return if url.blank?
    doc = load_doc(url)
    return unless detectable?(doc)
    meta = pick_meta_data(doc)
    image = meta[:image] || pick_content_image(doc)
    meta[:image] = correct_href(image, url) if image.present?
    meta
  end

  private

  def pick_meta_data(doc)
    (SOCIAL_TAG + [nil]).each_with_object({}) do |prefix, tag_meta|
      %i(title image description).each do |tag|
        property = [prefix, tag].compact.join(':')
        node = doc.css("meta[name='#{property}'], meta[property='#{property}']").first
        tag_meta[tag.to_sym] = node['content'] if node.present?
      end
      break tag_meta if tag_meta.present?
    end
  end

  def pick_content_image(doc)
    image = nil
    max_size = 0
    doc.css('img').each do |img|
      width = img['width'].to_i
      if width >= max_size
        image = img['src']
        max_size = width
      end
      break if max_size >= 200
    end
    image
  end
end
