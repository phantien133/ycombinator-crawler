class ServiceBase
  def execute!
    raise NoImplementError
  end

  class << self
    def execute!(*args, &block)
      new.execute!(*args, &block)
    end
  end
end
