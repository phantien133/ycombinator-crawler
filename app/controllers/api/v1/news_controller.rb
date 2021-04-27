class Api::V1::NewsController < ApplicationController
  def index
    render(
      json: Crawler::CrawList.execute(
        list_path: params[:list_path],
        page: params[:page],
      )
    )
  end

  def show
    render(
      json: LoadNew.execute(
        id: params[:id],
        link: params[:link],
      )
    )
  end
end
