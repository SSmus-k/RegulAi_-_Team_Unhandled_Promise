from rest_framework import serializers


class AIResponseSerializer(serializers.Serializer):
    schema_version   = serializers.CharField(default="1.0")
    summary          = serializers.CharField()
    key_points       = serializers.ListField(
                           child=serializers.CharField(),
                           required=False,
                           default=list,
                       )
    step_by_step     = serializers.ListField(
                           child=serializers.CharField(),
                           required=False,
                           default=list,
                       )
    legal_reference  = serializers.ListField(
                           child=serializers.CharField(),
                           required=False,
                           default=list,
                       )
    action_items     = serializers.ListField(
                           child=serializers.CharField(),
                           required=False,
                           default=list,
                       )
    confidence_score = serializers.FloatField(
                           min_value=0.0,
                           max_value=1.0,
                           default=0.0,
                       )
    risk_level       = serializers.CharField(required=False, default="")

    def validate(self, data):
        return data