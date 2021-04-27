module CacheHelper
  extend ActiveSupport::Concern

  included do
    def with_collection_cache(prefix, key, expires_in: 12.hours)
      since = cache.fetch(generate_cache_key(prefix, 'since'), expires_in: expires_in) do
        clean_cache(prefix)
        Time.current.to_s
      end.to_time
      clean_cache(prefix) if since - Time.current > expires_in
      cache.fetch(generate_cache_key(prefix, key), expires_in: expires_in) do
        yield if block_given?
      end
    end

    def clean_cache(prefix)
      Rails.cache.delete_matched("^#{prefix}_")
    end

    def form_cache_or_execute(key)
      data = cache.fetch(key) { nil }
      return data unless data.nil?
      Rails.cache.delete(key)
      yield if block_given?
    end

    def cache
      Rails.cache
    end

    def generate_cache_key(prefix, *args)
      ([prefix] + args).join('_')
    end
  end
end
